import classes from "./Feedback.module.css";
import photo from "./imgs/nat-8.jpg";
import ciri from "./imgs/ciri.jpg";
import geralt from "./imgs/geralt.jpg";
import videoMP4 from "./imgs/video.mp4";
import videoWebm from "./imgs/video.webm";

const Feedback = () => {
    return (
        <section className={classes["section-stories"]}>
            <div className={classes["bg-video"]}>
                <video
                    className={classes["bg-video__content"]}
                    autoPlay
                    muted
                    loop
                >
                    <source src={videoMP4} type="video/mp4" />
                    <source src={videoWebm} type="video/webm" />
                    Your browser is not supported!
                </video>
            </div>
            <div
                className={`${classes["u-center-text"]} ${classes["u-margin-bottom-big"]}`}
            >
                <h2 className={classes["heading-secondary"]}>
                    More than a million satisfied patients
                </h2>
            </div>
            <ul className={classes["story__list"]}>
                <div className={classes["story"]}>
                    <figure className={classes["story__shape"]}>
                        <img
                            src={geralt}
                            alt="Person on a tour"
                            className={`${classes["story__img"]} ${classes["geralt"]}`}
                        />
                        <figcaption className={classes["story__caption"]}>
                            Geralt of Rivia
                        </figcaption>
                    </figure>
                    <div className={classes["story__text"]}>
                        <h3
                            className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}
                        >
                            I had the best pediatric care for my child
                        </h3>
                        <p>
                            I brought my child to this hospital for an emergency
                            medical issue, and I cannot thank the staff enough
                            for their kindness and expertise. As a parent, it is
                            difficult to see your child in pain, but the doctors
                            and nurses were so gentle and reassuring that it
                            made a world of difference. They made sure that my
                            child was comfortable and informed throughout the
                            entire process, which put both of us at ease. I
                            would recommend this hospital to anyone in need of
                            pediatric care.
                        </p>
                    </div>
                </div>
                <div className={classes["story"]}>
                    <figure className={classes["story__shape"]}>
                        <img
                            src={ciri}
                            alt="Person on a tour"
                            className={`${classes["story__img"]} ${classes["ciri"]}`}
                        />
                        <figcaption className={classes["story__caption"]}>
                            Ciri
                        </figcaption>
                    </figure>
                    <div className={classes["story__text"]}>
                        <h3
                            className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}
                        >
                            The surgical team was skilled and professional
                        </h3>
                        <p>
                            I had to undergo a complex surgical procedure at
                            this hospital, and I couldn't have been happier with
                            the care I received. The surgical team was
                            incredibly skilled and attentive, and I felt
                            confident in their abilities from the moment I met
                            them. The recovery process was challenging, but the
                            nurses were there every step of the way to offer
                            encouragement and support. Even after I was
                            discharged, I received follow-up calls to check on
                            my progress and ensure that I was on track with my
                            recovery plan. I am grateful to have had such a
                            positive experience in the midst of a stressful
                            time. I recommend Andromeda Hospital for anyone
                            seeking complex surgerical interventions.
                        </p>
                    </div>
                </div>
            </ul>
        </section>
    );
};

export default Feedback;
