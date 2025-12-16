import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import './components/css/rozlozenia.css';

const Rozlozenie = () => {
    return (
        <>
            <Header />
            <main>
                <section className="rozlozenie">
                    <div className="container">
                        <h1>Adaptívne rozloženie tímu</h1>

                        <p className="intro-text">
                            Táto stránka demonštruje použitie <strong>Flexboxu</strong> a{' '}
                            <strong>CSS Grid systému</strong> na vytvorenie dynamického a
                            responzívneho rozloženia. Pri menších obrazovkách sa jednotlivé
                            prvky zoskupia do jedného stĺpca, zatiaľ čo pri väčších
                            rozlíšeniach sa zobrazujú vedľa seba.
                        </p>

                        <div className="grid-container">
                            {[
                                {
                                    name: 'Denis Ondruška',
                                    role: 'Frontend Developer',
                                    skills: 'HTML, CSS, JavaScript',
                                    img: '/pics/denis_pfp2.png',
                                },
                                {
                                    name: 'Dávid Krochliak',
                                    role: 'Frontend Developer',
                                    skills: 'HTML, CSS, JS',
                                    img: '/pics/david_pfp.png',
                                },
                                {
                                    name: 'Matúš Tokarčík',
                                    role: 'UI/UX Designer',
                                    skills: 'Figma, User Research',
                                    img: '/pics/matus_pfp3.jpg',
                                },
                                {
                                    name: 'Richard Valenta',
                                    role: 'UI/UX Designer',
                                    skills: 'Figma, User Research',
                                    img: '/pics/richard_pfp.jpg',
                                },
                                {
                                    name: 'Ukrajinec',
                                    role: 'ChatGPT Assistant',
                                    skills: 'Assistant',
                                    img: '/pics/ukrajinec_pfp.jpg',
                                },
                                {
                                    name: 'ChatGPT',
                                    role: 'Project Manager',
                                    skills: 'Mental SUPP, Code leader, Team Coordination',
                                    img: '/pics/ukrajinec_pfp.jpg',
                                },
                            ].map((member, index) => (
                                <article className="card2" key={index}>
                                    <img src={member.img} alt={member.name} />
                                    <h3>{member.name}</h3>
                                    <p className="role">{member.role}</p>
                                    <p className="skills">{member.skills}</p>
                                </article>
                            ))}
                        </div>

                        <div className="layout-info">
                            <h2>Technické detaily rozloženia</h2>

                            <div className="info-grid">
                                <div className="info-item">
                                    <h3>📱 Mobile First</h3>
                                    <p>1 stĺpec do 768px</p>
                                </div>
                                <div className="info-item">
                                    <h3>💻 Tablet</h3>
                                    <p>2 stĺpce (768px – 1200px)</p>
                                </div>
                                <div className="info-item">
                                    <h3>🖥️ Desktop</h3>
                                    <p>3 stĺpce nad 1200px</p>
                                </div>
                                <div className="info-item">
                                    <h3>🎯 CSS Grid</h3>
                                    <p>Auto rows pre konzistentnú výšku</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Rozlozenie;
