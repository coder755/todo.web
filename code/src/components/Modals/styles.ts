const modalSideMargin = 20;

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: `calc(100% - ${modalSideMargin * 2}px)`,
  height: `calc(100% - ${modalSideMargin * 2}px)`,
  bgcolor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll',
};

export const NO_OP = () => {};
