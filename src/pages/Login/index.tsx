import Title from "../../components/Title"
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useCallback, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true);
    const initialValues = { email: '', password: '' };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email invalid').required('Email is require.'),
        password: Yup.string().required('Password is require.'),
    })
    onAuthStateChanged(auth, (currentUser) => {
        localStorage.setItem('user', JSON.stringify(currentUser))
        // if (currentUser) {
        // }
        // else {
        //     localStorage.removeItem('user');
        //     notification.error({
        //         message: 'Failed',
        //         description: 'No user is currently signed in.',
        //         duration: 1.5,
        //         key: '1',
        //     });
        // }
    })
    const handleSignup = useCallback(async (values: { email: string, password: string }) => {
        try {
            await createUserWithEmailAndPassword(auth, values.email, values.password);
            notification.success({
                message: 'Success',
                description: 'Signup successfully!',
                duration: 1.5,
                key: '1',
            });


        } catch (error) {
            console.log(error);
            notification.error({
                message: 'Failed',
                description: 'Sigup failed!',
                duration: 1.5,
                key: '1',
            });
        }
    }, [])
    const handleLogin = useCallback(async (values: { email: string, password: string }) => {
        try {
            await signInWithEmailAndPassword(
                auth, values.email, values.password
            );
            notification.success({
                message: 'Success',
                description: 'Login successfully!',
                duration: 1.5,
                key: '1',
            });
            navigate('/list-blog')
        } catch (error) {
            console.log(error);
            notification.error({
                message: 'Failed',
                description: 'Login failed!',
                duration: 1.5,
                key: '1',
            });
        }
    }, [navigate])
    return (
        <div className="container">
            <div className="py-[50px]">
                <Title title={"Form"} titleActive={`${isLogin ? 'Login' : 'Signup'}`} subTitle={`${isLogin ? 'Login' : 'Signup'}`} />

                <Formik

                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={isLogin ? handleLogin
                        : handleSignup}
                    className='mt-[100px]'
                >
                    {({ isSubmitting }) => (
                        <Form className='mt-[100px] flex flex-col gap-[30px]'>
                            <div className='flex flex-col w-full'>
                                <Field type="email" className='input-form' name='email' placeholder='Your email' />
                                <ErrorMessage className='text-[#ff6347]' name="email" component="div" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <Field type="password" className='input-form' name='password' placeholder='Your password' />
                                <ErrorMessage className='text-[#ff6347]' name="password" component="div" />
                            </div>
                            <span onClick={() => setIsLogin(!isLogin)} className="text-white flex flex-row gap-2">{isLogin ? "Don't" : 'Do'} have account? <p className="text-my-yellow cursor-pointer hover:underline">{isLogin ? 'Signup' : 'Login'} now</p></span>
                            <button type="submit" disabled={isSubmitting} className='max-w-[230px] text-center uppercase text-white px-[30px] py-[10px] border rounded-md border-my-yellow hover:bg-my-yellow duration-200'>
                                {isLogin ? 'Login' : 'Signup'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}

export default Login