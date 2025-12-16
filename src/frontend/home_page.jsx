import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import './components/css/home_page.css';


const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.email) {
        return null;
    }

    return (
        <>
            <Header />
            <main>
                <section className="hero">
                    <img src="./pics/hero_bg.jpg" alt="Abstraktne ciernobiele pozadie"/>
                    <h2>Niečo málo o nás</h2>
                </section>

                <div className="card">
                    <img src="./pics/denis_pfp.jpg" alt="Profilova fotka clena tymu"/>
                    
                    <div>
                        <h3 className="name">Denis Ondruška</h3>
                        <p className="popis">
                            Som študent so záujmom o technológie a programovanie.<br/>
                            Vo voľnom čase sa venujem motorkám a jazde, ktorá mi prináša slobodu a energiu.
                            Popri štúdiu pracujem v predajni Xiaomi,
                            kde spájam techniku s praxou každodenným kontaktom so zákazníkmi.
                        </p>
                    </div>
                </div>

                <div className="card">
                    <img src="./pics/david_pfp.png" alt="Profilova fotka clena tymu"/>
                    <div className="reverse">
                        <h3 className="name">Dávid Krochliak</h3>
                        <p className="popis">
                            Som študent počítačových sietí na TUKE , nikto nečakal
                            Obľúbené kratochvíle zahŕňajú hry (ako lolko,help) , cvičenie a kulinárske aktivity.
                            Kaufland prodigy,
                            Extrovert na baterky.
                        </p>
                    </div>
                </div>
                
                <div className="card">
                    <img src="./pics/matus_pfp.png" alt="Profilova fotka clena tymu"/>
                    
                    <div>
                        <h3 className="name">Matúš Tokarčík</h3>
                        <p className="popis">
                            Volám sa  Matúš Tokarčík a zaujímam sa o šport a technológie počítačov. Mimo školy sa venujem rekreačnému pitiu piva a zábavou. Som pracovitý človek so zodpovednosťou ale zároveň do všetkého dávam pozitívnu energiu.	
                        </p>
                    </div>
                </div>
                
                <div className="card">
                    <img src="./pics/richard_pfp.jpg" alt="Profilova fotka clena tymu"/>
                    
                    <div className="reverse">
                        <h3 className="name">Richard Valenta</h3>
                        <p className="popis">
                            Som študent, ktorý cvičí ako mozog, tak aj svaly. Mám v záľube autá, motorky a všetko čo má kolesá. Venujem sa športu, hlavne posilňovaniu, ale baví ma aj turistika, bicyklovanie a behanie.
                        </p>
                    </div>
                </div>

                <div className="card">
                    <img src="./pics/ukrajinec_pfp.jpg" alt="Profilova fotka clena tymu"/>
                    
                    <div>
                        <h3 className="name">Ukrajinec</h3>
                        <p className="popis">
                            Som študent TUKE FEI, zaujímam sa o technológie a vo voľnom čase ich rád študujem.
                            Taktiež mám rád prechádzky s priateľmi a cestovanie.
                        </p>
                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
};

export default HomePage;