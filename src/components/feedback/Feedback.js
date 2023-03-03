
import classes from "./Feedback.module.css";
import photo from "./imgs/nat-8.jpg";
import videoMP4 from "./imgs/video.mp4";
import videoWebm from "./imgs/video.webm";

const Feedback = () => {
    return (
        <section className={classes["section-stories"]}>
            <div className={classes["bg-video"]}>
                <video className={classes["bg-video__content"]} autoPlay muted loop>
                    <source src={videoMP4} type="video/mp4" />
                    <source src={videoWebm} type="video/webm" />
                    Your browser is not supported!
                </video>
            </div>
            <div className={`${classes["u-center-text"]} ${classes["u-margin-bottom-big"]}`}>
                <h2 className={classes["heading-secondary"]}>
                    We make people genuinely happy
                </h2>
            </div>
            <ul className={classes["story__list"]}>
                <div className={classes["story"]}>
                    <figure className={classes["story__shape"]}>
                        <img src={photo} alt="Person on a tour" className={classes["story__img"]} />
                        <figcaption className={classes["story__caption"]}>Mary Smith</figcaption>
                    </figure>
                    <div className={classes["story__text"]}>
                        <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>I had the best week ever with my family</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
                            ducimus quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente aspernatur libero
                            repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.
                        </p>
                    </div>
                </div>
                <div className={classes["story"]}>
                    <figure className={classes["story__shape"]}>
                        <img src={photo} alt="Person on a tour" className={classes["story__img"]} />
                        <figcaption className={classes["story__caption"]}>Mary Smith</figcaption>
                    </figure>
                    <div className={classes["story__text"]}>
                        <h3 className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}>I had the best week ever with my family</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
                            ducimus quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente aspernatur libero
                            repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.
                        </p>
                    </div>
                </div>
            </ul>
        </section>
    );
}

export default Feedback;