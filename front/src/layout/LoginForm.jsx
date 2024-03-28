import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';
import '../layout/styles.css';

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: '',
    password: ''
  });
  const [language, setLanguage] = useState('THAI');

  const handleChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: input.email,
        password: input.password
      });
      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      const userResponse = await axios.get('http://localhost:8000/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(userResponse.data);
      if (userResponse.data.role === 'ADMIN') {
       
        window.location = '/header';
      } else {
    
        window.location = '/header'; // หรือ URL ของหน้า UserHeader อื่นๆ ที่ต้องการ
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="background-container relative flex items-center justify-center h-screen">
      <div className="language-switch absolute top-0 right-0 mt-10 mr-10">
        <button onClick={() => handleLanguageChange('THAI')}>
          TH<span> | </span>
        </button>
        <button onClick={() => handleLanguageChange('ENGLISH')}>
          EN
        </button>
        <div className="logo mt-30 " />
      </div>

      <div className="login-border p-5 rounded mt-5">
        <div className="login-logo mb-5"></div>
        <div className="login">{language === 'THAI' ? 'เข้าสู่ระบบ' : 'Login'}</div>
        <form className="flex flex-col gap-2 form-container" onSubmit={handleSubmit}>
          <label className="form-control">
            <div className="flex items-center">
              <input
                type="text"
                className="input input-bordered"
                name="email"
                placeholder={language === 'THAI' ? 'อีเมล' : 'Email'}
                value={input.email}
                onChange={handleChange}
              />
            </div>
          </label>

          <label className="form-control">
            <div className="flex items-center">
              <input
                type="password"
                className="input input-bordered"
                name="password"
                placeholder={language === 'THAI' ? 'รหัสผ่าน' : 'Password'}
                value={input.password}
                onChange={handleChange}
              />
            </div>
          </label>
          <div className="register-link2">
            <a href="/register">{language === 'THAI' ? 'สร้างบัญชีใหม่?' : 'New account'}</a>
          </div>

          <div className="form-actions">
            <button className="btn btn-success">{language === 'THAI' ? 'เข้าสู่ระบบ' : 'Login'}</button>
          </div>
          <div className="link3">
            <a href="/header">{language === 'THAI' ? 'กลับหน้าหลัก' : 'Back to home'}</a>
          </div>
        </form>
      </div>
    </div>
  );
}
