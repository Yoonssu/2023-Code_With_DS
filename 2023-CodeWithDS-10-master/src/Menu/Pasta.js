import {Link} from "react-router-dom";
import "./AllMenu.css";

function Pasta({pastaArray}) {
  return (
    <div className='all_list'>
      <ul className='all_wrap'>
        {pastaArray.map((item, index) => (
          <li className='menuData'>
            <Link to={`/${item.title}`}>
                <dl>
                  <dt>
                      <img src={process.env.PUBLIC_URL + item.img} alt={item.id} width='130px' height='130px'/>
                  </dt>
                  <dd>{item.title}</dd>
                </dl>
              </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  };

export default Pasta;