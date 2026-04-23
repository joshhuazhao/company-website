import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { BsMicrosoft } from 'react-icons/bs';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
    show: boolean;
    onHide: () => void;
}

const LoginModal = ({ show, onHide }: LoginModalProps) => {
    const { t } = useTranslation();
    const { loginWithGoogle } = useAuth();

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            // AuthContext handles Firestore user creation
            onHide();
        } catch (error: any) {
            console.error("Error signing in with Google", error);
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered className="login-modal">
            <Modal.Header closeButton className="border-0 pb-0">
            </Modal.Header>
            <Modal.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-2">{t('loginPage.title')}</h2>
                    <p className="text-muted">{t('loginPage.subtitle')}</p>
                </div>

                <div className="d-grid gap-2 mb-4">
                    <Button
                        variant="outline-light"
                        className="d-flex align-items-center justify-content-center border text-dark bg-white shadow-sm py-2"
                        onClick={handleGoogleLogin}
                    >
                        <FcGoogle size={20} className="me-2" />
                        {t('loginPage.socialSignIn', { provider: 'Google' })}
                    </Button>
                    <Button variant="outline-light" className="d-flex align-items-center justify-content-center border text-dark bg-white shadow-sm py-2">
                        <FaGithub size={20} className="me-2" />
                        {t('loginPage.socialSignIn', { provider: 'GitHub' })}
                    </Button>
                    <Button variant="outline-light" className="d-flex align-items-center justify-content-center border text-dark bg-white shadow-sm py-2">
                        <BsMicrosoft size={20} className="me-2 text-primary" />
                        {t('loginPage.socialSignIn', { provider: 'Microsoft' })}
                    </Button>
                </div>

                <div className="d-flex align-items-center mb-4">
                    <hr className="flex-grow-1 my-0" />
                    <span className="px-3 text-muted small">{t('loginPage.orDivider')}</span>
                    <hr className="flex-grow-1 my-0" />
                </div>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>{t('loginPage.emailLabel')}</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" size="lg" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>{t('loginPage.passwordLabel')}</Form.Label>
                        <Form.Control type="password" size="lg" />
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Form.Check type="checkbox" label={t('loginPage.rememberMe')} />
                        <a href="#forgot" className="text-decoration-none small">{t('loginPage.forgotPassword')}</a>
                    </div>

                    <div className="d-grid">
                        <Button variant="primary" size="lg" type="submit">
                            {t('loginPage.signInButton')}
                        </Button>
                    </div>
                </Form>

                <div className="text-center mt-4">
                    <p className="mb-0 text-muted">
                        {t('loginPage.noAccount')} <a href="#signup" className="text-decoration-none fw-bold">{t('loginPage.signUpLink')}</a>
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;
