
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const modalComment = () => {

  return (
    <div className="">
      <div id="openModal" className="modalDialog">
          <div>	<a href="#close" title="Close" className="close">
          <FontAwesomeIcon icon="times" color={'#fff'}/>
          </a>

                <h2>Modal Box</h2>

              <p>This is a sample modal box that can be created using the powers of CSS3.</p>
              <p>You could do a lot of things here like have a pop-up ad that shows when your website loads, or create a login/register form for users.</p>
          </div>
      </div>
    </div>
  ) 
}

export default modalComment;