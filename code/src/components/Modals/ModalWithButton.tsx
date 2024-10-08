/* eslint-disable react/require-default-props */
import * as React from 'react';
import {
  Backdrop, Box, Button, Fade, Modal, styled,
} from '@mui/material';
import { modalStyle } from './styles';
import BaseButton from '../BaseButton';

const StyledModal = styled(Modal)(({ theme }) => ({
  '& .MuiBox-root': {
    width: '350px',
    maxHeight: '90%',
    padding: theme.spacing(4),
    overflow: 'auto',
    backgroundColor: '#FFF',
  },
}));

const CloseButton = styled(BaseButton)(() => (
  {
    borderColor: '#000',
    color: '#000',
  }
));

type ModalWithButtonProps = {
  children: React.ReactNode,
  openText: string,
  closeText?: string,
  onClose?: () => Promise<void>
};

const defaultState = {
  isOpen: false,
};

function ModalWithButton({
  children, openText, closeText = 'Close', onClose = () => new Promise((res) => { res(); }),
}: ModalWithButtonProps) {
  const [isOpen, setIsOpen] = React.useState(defaultState.isOpen);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <BaseButton onClick={handleOpen}>{openText}</BaseButton>
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={modalStyle}>
            <CloseButton onClick={handleCancel}>Cancel</CloseButton>
            <Button onClick={handleClose}>{closeText}</Button>
            {
              children
            }
          </Box>
        </Fade>
      </StyledModal>
    </div>
  );
}

export default ModalWithButton;
