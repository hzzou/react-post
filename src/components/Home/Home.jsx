import React from 'react';
import {Link} from 'react-router-dom';
import './Home.scss';


class Home extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      name: 'hzlzh'
    }
  }

  render(){
    const {name} = this.state;
    return (
      <div className="home">
        <header className="header">这是Home组件 {name}</header>
        <div className="body">
          <Link to="/hookcom" >
            跳转到Hooks组件
          </Link>
        </div>
      </div>
    );
    
  }
}

export default Home;