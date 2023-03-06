import Title from "../../components/title/Title";
import Features from "../../components/features/Features";
import Feedback from "../../components/feedback/Feedback";
import Footer from "../../components/footer/Footer";

const HomePage = () => {
    return (
        <div className="crown scroller">
            <Title />
            <Features />
            <Feedback />
            <Footer />
        </div>
    );
};

export default HomePage;
