import { Link } from 'react-router-dom';

const Home = (props) => {
  
    const handleRender = () => {
        if (props.currentUser !== null) {
            return (
                <ul className="home-links" id='home-links'>
                    <Link to='/diez-palabras'><li style={{color: "purple"}}>Tien woorden oefenen / 
                    Practica diez palabras</li></Link>
                </ul>
            )
        } else {
            return (
                <p>Please login.</p>
            )
        }
    }

    return (
    <div className="home">
        {handleRender()}
    </div>
    );
    };
        
    export default Home;