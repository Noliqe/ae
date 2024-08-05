import { Link } from 'react-router-dom';
import "./styles/home.css";
import Tests from './Tests';
import firstImage from './Images/spainIThink.jpg';


const Home = (props) => {
  
    const handleRender = () => {
        if (props.currentUser !== null) {
            return (
                <div className="home-links" id='home-links'>
                    <Tests className={'first-test-image'} imgSrc={firstImage} title={'Elke dag tien woorden'} link={'/diez-palabras'} testName={'Practica diez palabras'}/>
                </div>
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