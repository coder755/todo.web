export const CreateDeepCopy = <ArgType>(arg: ArgType): ArgType => {
  const jsonStr = JSON.stringify(arg);
  const obj = JSON.parse(jsonStr) as ArgType;
  return obj;
};

export const NO_OP = () => {};
