using System.Collections.Generic;
using Amazon.CDK;
using Amazon.CDK.AWS.CertificateManager;
using Amazon.CDK.AWS.CloudFront;
using Amazon.CDK.AWS.CloudFront.Origins;
using Amazon.CDK.AWS.Cognito;
using Amazon.CDK.AWS.ElasticLoadBalancingV2;
using Amazon.CDK.AWS.IAM;
using Amazon.CDK.AWS.KMS;
using Amazon.CDK.AWS.Route53;
using Amazon.CDK.AWS.Route53.Targets;
using Amazon.CDK.AWS.S3;
using Constructs;

namespace Infrastructure;

public class WebStack : Stack
{
    private const string TodoDomainName = "huckandrose.com";

    private const string UsersLoadBalancerArn =
        "arn:aws:elasticloadbalancing:us-east-1:442042533215:loadbalancer/app/todo-todoUsers/4ce7bb0f63e53c7c";
    
    internal WebStack(Construct scope, string stackId, string serviceId, IStackProps props) : base(scope, stackId, props)
    {
        const string baseNamespace = "todo";
        var serviceNamespace = baseNamespace + "." + serviceId;
        var dashedServiceNamespace = baseNamespace + "-" + serviceId;

        // var kmsKey = new Key(this, serviceNamespace + ".KmsCMK", new KeyProps {
        //     KeySpec = KeySpec.ECC_NIST_P256,
        //     KeyUsage = KeyUsage.SIGN_VERIFY
        // });

        var todoHostedZone = new HostedZone(this, serviceNamespace + ".Hostedzone", new HostedZoneProps
        {
            ZoneName = TodoDomainName,
            
        });
        // todoHostedZone.EnableDnssec(new ZoneSigningOptions { KmsKey = kmsKey });
        
        // ensure that the DNS name servers match the Hosted Zone name servers (these are different than the ns record)
        // look at the hosted zone itself
        var todoCertificate = new Certificate(this, serviceNamespace + ".certificate", new CertificateProps {
            DomainName = TodoDomainName,
            CertificateName = "todoCertificate",  // Optionally provide an certificate name
            Validation = CertificateValidation.FromDns(todoHostedZone)
        });
        
        var bucketName = serviceNamespace + ".bucket";
        var sourceBucket = new Bucket(this, bucketName, new BucketProps
        {
            BucketName = bucketName,
            RemovalPolicy = RemovalPolicy.DESTROY,
            WebsiteIndexDocument = "index.html",
            WebsiteErrorDocument = "index.html",
            PublicReadAccess = true,
            BlockPublicAccess = BlockPublicAccess.BLOCK_ACLS
        });

        sourceBucket.AddToResourcePolicy(new PolicyStatement(new PolicyStatementProps
        {
            Actions = new []{"s3:GetObject"},
            Resources = new []{$"{sourceBucket.BucketArn}"},
            Principals = new IPrincipal[]{new AnyPrincipal()}
        }));
        
        var oai = new OriginAccessIdentity(this, serviceNamespace + ".oai", new OriginAccessIdentityProps
        {
            Comment = "Connects " + bucketName + " to " + stackId + " CDN"
        });
        sourceBucket.GrantRead(oai);
        
        // Load balancers
        var userLoadBalancer = ApplicationLoadBalancer.FromLookup(this, serviceNamespace + "LoadBalancer.Users",
            new ApplicationLoadBalancerLookupOptions
        {
            LoadBalancerArn = UsersLoadBalancerArn
        });
        
        // Behaviors
        var userBehaviorOptions = new BehaviorOptions
        {
            Origin = new LoadBalancerV2Origin(userLoadBalancer),
            ViewerProtocolPolicy = ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            AllowedMethods = AllowedMethods.ALLOW_ALL,
            CachePolicy = CachePolicy.CACHING_DISABLED,
            OriginRequestPolicy = OriginRequestPolicy.ALL_VIEWER
        };
        
        var todoBehaviorOptions = new BehaviorOptions
        {
            Origin = new LoadBalancerV2Origin(userLoadBalancer),
            ViewerProtocolPolicy = ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            AllowedMethods = AllowedMethods.ALLOW_ALL,
            CachePolicy = CachePolicy.CACHING_DISABLED,
            OriginRequestPolicy = OriginRequestPolicy.ALL_VIEWER
        };
        
        var todoItDistribution = new Distribution(this, serviceNamespace + ".CloudFront.Distribution", new DistributionProps
        {
            DefaultBehavior = new BehaviorOptions
            {
                Origin = new S3Origin(sourceBucket),
                ViewerProtocolPolicy = ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                CachePolicy = CachePolicy.CACHING_DISABLED,
                AllowedMethods = AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
            },
            AdditionalBehaviors = new Dictionary<string, IBehaviorOptions>
            {
                ["/api/user/*"] = userBehaviorOptions,
                ["/api/todo/*"] = todoBehaviorOptions,
            },
            DefaultRootObject = "index.html",
            Certificate = todoCertificate,
            DomainNames = new []{TodoDomainName},
            EnableIpv6 = false,
            ErrorResponses = new IErrorResponse[]
            {
                new ErrorResponse
                {
                    HttpStatus = 404,
                    ResponsePagePath = "/index.html", // Redirect to index.html for 404 errors
                    ResponseHttpStatus = 200,
                }
            }
        });
        
        var todoARecord = new ARecord(this, serviceNamespace + ".aRecord", new ARecordProps
        {
            Zone = todoHostedZone,
            Target = RecordTarget.FromAlias(new CloudFrontTarget(todoItDistribution))
        });
        
        var userPool = new UserPool(this, serviceNamespace + ".userpool", new UserPoolProps
        {
            UserPoolName = dashedServiceNamespace + "-user-pool",
            AutoVerify = new AutoVerifiedAttrs
            {
                Email = true,
                Phone = false
            },
            SelfSignUpEnabled = true,
            UserVerification = new UserVerificationConfig {
                EmailSubject = "Verify your email for Coder's Todo App!",
                EmailBody = "Thanks for signing up for Coder's Todo App! Your verification code is {####}",
                EmailStyle = VerificationEmailStyle.CODE,
                SmsMessage = "Thanks for signing up for Coder's Todo App! Your verification code is {####}"
            },
            SignInCaseSensitive = false,
            AccountRecovery = AccountRecovery.EMAIL_ONLY,
            RemovalPolicy = RemovalPolicy.DESTROY,
            PasswordPolicy = new PasswordPolicy {
                MinLength = 6,
                RequireLowercase = false,
                RequireUppercase = false,
                RequireDigits = false,
                RequireSymbols = false
            }
        });
        
        var appClient = userPool.AddClient(dashedServiceNamespace + "-app-client", new UserPoolClientOptions
        {
            UserPoolClientName = dashedServiceNamespace + "-app-client",
            AuthFlows = new AuthFlow
            {
                UserPassword = true
            }
        });
    }
}

