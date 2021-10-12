import React from "react"
import landingSplash from '../Assets/sets_landing.png'
import './Home.css'

const Home = () => {


    return (<div className='container mt-5'>
                <h1 className='Home-title text-primary'>Sets</h1>
                <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-center mt-3">
                    <div class="col d-flex justify-content-center text-center mb-3">
                        <div className='Home-menu-item' style={{width:'75%'}} >
                            <img src="https://sanderevers.github.io/assets/img/62r.png"  class="shadow-lg rounded Home-image" style={{width:'100%'}} alt="..."/>
                            <h5 className='mt-3 Home-menu-item-title text-primary'>Single Player</h5>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Nulla neque ligula, iaculis rutrum erat vitae, congue tempus massa. 
                            </p>
                        </div>
                    </div>
                    <div class="col d-flex justify-content-center text-center mb-3">
                        <div className='Home-menu-item' style={{width:'75%'}} >
                            <img src="https://sanderevers.github.io/assets/img/62r.png"  class="mx-auto shadow-lg rounded Home-image" style={{width:'100%'}} alt="..."/>
                            <h5 className='mt-3 Home-menu-item-title text-primary'>Multiplayer</h5>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Mauris lectus enim, tristique ac nisi et, pharetra luctus odio.
                            </p>
                        </div>
                    </div>
                    <div class="col d-flex justify-content-center text-center mb-3">
                        <div className='Home-menu-item' style={{width:'75%'}} >
                            <img src="https://sanderevers.github.io/assets/img/62r.png"  class="mx-auto shadow-lg rounded Home-image" style={{width:'100%'}} alt="..."/>
                            <h5 className='mt-3 Home-menu-item-title text-primary'>Leaderboard</h5>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Nulla neque ligula, iaculis rutrum erat vitae, congue tempus massa. 
                            </p>
                        </div>
                    </div>
                </div>
    </div>)

}

export default Home;