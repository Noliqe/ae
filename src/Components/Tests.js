import './styles/home.css';
import { Link } from 'react-router-dom';

const Tests = (props) => {
return (
<div className="tests" id='tests'>
    <div className={(props.className, 'test-images')} id={(props.className, 'test-images')} style={{backgroundImage: `url(${props.imgSrc})`}}></div>
            <h2>{props.title}</h2>
            <ul>
            <Link to={props.link}>
                <li>{props.testName}</li>
                </Link>
            </ul>
</div>
);
};
        
export default Tests;