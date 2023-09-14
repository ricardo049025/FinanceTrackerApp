import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './boxmenu.css';

const Boxmenu = ({color, icon, title, description}) => {

    return (
        <div className="box" style={{backgroundColor: color}}>
            <div className="box-header">
                <FontAwesomeIcon icon={icon} color="black" className="icon"/>
            </div>
            <div className="box-body">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
      );

}

export default Boxmenu;