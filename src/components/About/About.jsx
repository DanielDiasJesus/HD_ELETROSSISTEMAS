import React from 'react';
import './About.scss';
export default function About(){
    return(
        <div className="about">
            <div className="about__header">
                <div className="about__header__title">
                    <h2>NOSSO JEITO DE SER</h2>
                </div>
                <p>
                    Somos a empresa que faz o melhor por nossos clientes e que representa fielmente nossos fornecedores. 
                    Trabalhamos com excelência para o seu sonho virar realidade.
                </p>
            </div>
            <div className="about__content">
                <div className="about__content__header">
                    <h3>
                        A HD Eletrossistemas é uma empresa especializada na área de Engenharia Civíl e suas vertentes.
                        Nossa empresa nasceu em 2013 em meio da escassez existente no mercado de uma <span className="destaque">seriedade, </span> 
                        <span className="destaque">responsabilidade</span> e <span className="destaque">qualidade</span> nos ramos da Engenharia Cívil.
                    </h3>
                    <h3>
                        Notamos que a relação dos clientes e fornecedores com outros prestadores de serviços 
                        era carente de atenção e de compromisso.

                        A partir disso, desenvolvemos a melhor solução existente atualmente no mercado: a <span className="destaque">HD Eletrossistemas.</span></h3>                    
                    <h3><span className="destaque">O trabalho da HD é refletido por nosso método único que consiste em 3 pilares:</span></h3>
                </div>
                <div className="about__content__method">
                    <article className="about__content__method__card" style={{background: "#008ECC"}}>
                        <div className="about__content__method__card__header">
                            <h3>Confiabilidade</h3>
                        </div>
                        <div className="about__content__method__card__content">
                            <h4>Agimos com base no princípio fundamental de qualquer negócio: Confiança.
                            
                                Pensamos na confiança de nossos clientes como nosso maior tesouro. 
                                Com sua confiança realizamos nossos serviços da melhor 
                                forma possível.
                            </h4>
                        </div>
                    </article>
                    <article className="about__content__method__card" style={{background: "#006896"}}> 
                        <div className="about__content__method__card__header">
                            <h3>Responsabilidade</h3>
                        </div>
                        <div className="about__content__method__card__content">
                            <h4>
                                Como empresa responsável, nós elevamos a satisfação dos nossos clientes e
                                a fidelidade de nossos fornecedores, e com isso, adquirimos maior capacidade de
                                competitividade e inovação de nosso trabalho.
                                Ser responsável garante sua confiança.
                            </h4>
                        </div>
                    </article>
                    <article className="about__content__method__card" style={{background: "#005275"}}> 
                        <div className="about__content__method__card__header">
                            <h3>Qualidade</h3>
                        </div>
                        <div className="about__content__method__card__content">
                            <h4>
                                Somos responsáveis por garantir que o seu sonho seja realizado com excelência.
                                Acreditamos que o desejo do cliente é o combustível da HD,
                                somos movidos em fornecer o melhor de nossos serviços da melhor forma possível.
                            </h4>
                        </div>
                    </article>
                </div>
                <div className="about__content__facts">
                    <div className="about__content__facts__header">
                        <h3>
                            Contamos com profissionais qualificados e experientes, com os melhores materiais e 
                            tecnologia de ponta para melhor te atender,
                            somos flexíveis quando fechamos um contrato, e agimos de acordo com sua necessidade.
                        </h3>
                    </div>
                    <div className="about__content__facts__main">
                        <div className="about__content__facts__main__item">
                            <div className="about__content__facts__main__item__title">
                                <h2>08</h2>
                            </div>
                            <div className="about__content__facts__main__item__subtitle">
                                <h3>ANOS DE TRABALHO</h3>
                            </div>
                        </div>
                        <div className="about__content__facts__main__item">
                            <div className="about__content__facts__main__item__title">
                                <h2>+80</h2>
                            </div>
                            <div className="about__content__facts__main__item__subtitle">
                                <h3>PROJETOS CONCLUIDOS</h3>
                            </div>
                        </div>
                        <div className="about__content__facts__main__item">
                            <div className="about__content__facts__main__item__title">
                                <h2>20</h2>
                            </div>
                            <div className="about__content__facts__main__item__subtitle">
                                <h3>CIDADES VISITADAS PARA CLIENTES</h3>
                            </div>
                        </div>
                        <div className="about__content__facts__main__item">
                            <div className="about__content__facts__main__item__title">
                                <h2>82%</h2>
                            </div>
                            <div className="about__content__facts__main__item__subtitle">
                                <h3>DE SATISFAÇÃO EM NOSSAS RELAÇÕES</h3>
                            </div>
                        </div>
                        <div className="about__content__facts__main__item">
                            <div className="about__content__facts__main__item__title">
                                <h2>0</h2>
                            </div>
                            <div className="about__content__facts__main__item__subtitle">
                                <h3>VEZES RECLAMADO POR NOSSAS RELAÇÕES</h3>
                            </div>
                        </div>
                        <div className="about__content__facts__main__item">
                            <div className="about__content__facts__main__item__icon">
                                <img src={require("../../assets/img/icons/CERTIFICADO.png")} alt=""/>
                            </div>
                            <div className="about__content__facts__main__item__subtitle">
                                <h3>CERTIFICADOS EM TODAS AS ÁREAS DE ATUAÇÃO</h3>
                            </div>
                        </div>
                        <div className="about__content__facts__main__item">
                            <div className="about__content__facts__main__item__title">
                                <h2>30</h2>
                            </div>
                            <div className="about__content__facts__main__item__subtitle">
                                <h3>CIDADES DE ATUAÇÃO DA EMPRESA</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}