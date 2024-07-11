import { curve } from "../assets";
import Button from "../Components/Button";
import Section from "../design/Section";
import { BottomLine } from "../design/Hero";

const Hero = () => {
    return (
        <Section
            className="pt-[12rem] -mt-[5.25rem]"
            crosses
            crossesOffset="lg:translate-y-[5.25rem]"
            customPaddings
            id="hero"
        >
            <div className="container relative">
                <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
                    <h1 className="h2 mb-10">
                        Level up Fairly ! <br></br>Tired of contests rigged by cheaters? <br></br>We are too.<br></br><br></br> Introducing {" "}
                        <span className="inline-block relative">
                            LC Police{" "}
                            <img
                                src={curve}
                                className="absolute top-full left-0 w-full xl:-mt-2"
                                width={624}
                                height={28}
                                alt="Curve"
                            />
                        </span>
                    </h1>
                    <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8 mt-6">
                        This app exposes the top 2,000 plagiarizers (more coming soon!), identifying code matches over 90% from leaks. Now you can compete on a fair playing field and showcase your true skills!
                    </p>
                </div>
            </div>

            <BottomLine />
        </Section>
    );
};

export default Hero;