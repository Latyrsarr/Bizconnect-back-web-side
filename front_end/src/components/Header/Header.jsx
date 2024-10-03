// import React from 'react';
// import './Header.css';
// import logoImg from '../../assets/Logo.png';
// import loginImg from '../../assets/profil.svg';

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="container">
//         <div className="logo">
//           <a href="/home">
//             <img src={logoImg} alt="BizConnect Logo" className="logoImg" />
//           </a>
//         </div>
//         <div className="navigation-links">
//           <a href="/home">HOME</a>
//           <a href="/about">ABOUT</a>
//           <a href="/services">SERVICES</a>
//           <a href="/why-us">WHY US</a>
//           <a href="/team">TEAM</a>
//           <a href="/login">
//             <img className='login' src={loginImg} alt="Login" />
//           </a>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/Logo.png';
import loginImg from '../../assets/profil.svg';

const Header = () => {
  const location = useLocation(); // Obtenez l'URL actuelle

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <a href="/home">
            <img src={logoImg} alt="BizConnect Logo" className="logoImg" />
          </a>
        </div>
        <div className="navigation-links">
          <Link
            to="/home"
            className={location.pathname === '/home' ? 'active' : ''}
          >
            HOME
          </Link>
          <Link
            to="/about"
            className={location.pathname === '/about' ? 'active' : ''}
          >
            ABOUT
          </Link>
          <Link
            to="/services"
            className={location.pathname === '/services' ? 'active' : ''}
          >
            SERVICES
          </Link>
          <Link
            to="/why-us"
            className={location.pathname === '/why-us' ? 'active' : ''}
          >
            WHY US
          </Link>
          <Link
            to="/team"
            className={location.pathname === '/team' ? 'active' : ''}
          >
            TEAM
          </Link>
          <Link to="/login">
            <img className='login' src={loginImg} alt="Login" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
