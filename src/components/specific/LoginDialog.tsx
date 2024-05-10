// src/components/specific/LoginDialog.tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface LoginDialogProps {
    open: boolean;
    onClose: (name: string) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
    const [name, setName] = useState('');

    const handleClose = () => {
        onClose(name);
    };

    return (
        <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Enter Your Name</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;
