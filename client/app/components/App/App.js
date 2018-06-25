import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import SignIn from '../SignIn/SignIn';
// import SignUp from '../SignUp/SignUp';
// import Dashboard from '../Dashboard/Dashboard';

const App = ({ children }) => (
  <>
    <Header />

    <main>
      {children}
    </main>

    <Footer />
  </>
);

export default App;
