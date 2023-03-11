import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ContactPage.css";

import saptarshi from "./imgs/saptarshi.jpg";
import ayush from "./imgs/ayush.jpg";

const ContactPage = () => {
    return (
        <div class="container">
            <div class="card">
                <img
                    src={ayush}
                    alt="Person"
                    class="card__image"
                />
                <p class="card__name">Ayush Dwivedi</p>
                {/* <div class="grid-container">
                    <div class="grid-child-posts">mallikritwik2014@gmail.com</div>
                </div>
                <div class="grid-container">
                    <div class="grid-child-posts">8617290014</div>
                </div> */}
                <div class="info__block">
                    <div class="info">
                        <FontAwesomeIcon icon={faEnvelope} class="icon" />{" "}
                        mallikritwik2014@gmail.com
                    </div>
                    <div class="info">
                        <FontAwesomeIcon icon={faPhone} class="icon" />{" "}
                        8617290014
                    </div>
                </div>
            </div>
            <div class="card">
                <img
                    src="https://lh3.googleusercontent.com/pZwZJ5HIL5iKbA91UGMUIPR0VJWa3K0vOGzDZmY6wU3EJBUdfsby3VEyxU162XxTyOyP3D154tjkr-4Jgcx8lygYUR8eB-jVmld4dsHi1c-mE_A8jKccseAG7bdEwVrcuuk6ciNtSw=s170-no"
                    alt="Person"
                    class="card__image"
                />
                <p class="card__name">Ritwik Ranjan Mallik</p>
                {/* <div class="grid-container">
                    <div class="grid-child-posts">mallikritwik2014@gmail.com</div>
                </div>
                <div class="grid-container">
                    <div class="grid-child-posts">8617290014</div>
                </div> */}
                <div class="info__block">
                    <div class="info">
                        <FontAwesomeIcon icon={faEnvelope} class="icon" />{" "}
                        mallikritwik2014@gmail.com
                    </div>
                    <div class="info">
                        <FontAwesomeIcon icon={faPhone} class="icon" />{" "}
                        8617290014
                    </div>
                </div>
            </div>
            <div class="card">
                <img
                    src="https://lh3.googleusercontent.com/pZwZJ5HIL5iKbA91UGMUIPR0VJWa3K0vOGzDZmY6wU3EJBUdfsby3VEyxU162XxTyOyP3D154tjkr-4Jgcx8lygYUR8eB-jVmld4dsHi1c-mE_A8jKccseAG7bdEwVrcuuk6ciNtSw=s170-no"
                    alt="Person"
                    class="card__image"
                />
                <p class="card__name">Sake Venkata Vignan Kumar</p>
                {/* <div class="grid-container">
                    <div class="grid-child-posts">mallikritwik2014@gmail.com</div>
                </div>
                <div class="grid-container">
                    <div class="grid-child-posts">8617290014</div>
                </div> */}
                <div class="info__block">
                    <div class="info">
                        <FontAwesomeIcon icon={faEnvelope} class="icon" />{" "}
                        mallikritwik2014@gmail.com
                    </div>
                    <div class="info">
                        <FontAwesomeIcon icon={faPhone} class="icon" />{" "}
                        8617290014
                    </div>
                </div>
            </div>
            <div class="card">
                <img
                    src={saptarshi}
                    alt="Person"
                    class="card__image"
                />
                <p class="card__name">Saptarshi De Chaudhury</p>
                {/* <div class="grid-container">
                    <div class="grid-child-posts">mallikritwik2014@gmail.com</div>
                </div>
                <div class="grid-container">
                    <div class="grid-child-posts">8617290014</div>
                </div> */}
                <div class="info__block">
                    <div class="info">
                        <FontAwesomeIcon icon={faEnvelope} class="icon" />{" "}
                        mallikritwik2014@gmail.com
                    </div>
                    <div class="info">
                        <FontAwesomeIcon icon={faPhone} class="icon" />{" "}
                        8617290014
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
