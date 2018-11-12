import React, { Component } from 'react'

export class AppsLink extends Component {
    static propTypes = {

    }

    render() {
        return (
            <section id="apps-link">
                <div className="container-fluid">
                    <div className="d-flex flex-column justify-content-center">
                        <h3>All You Need for your car in one app</h3>
                        <p>Download for free</p>
                    </div>
                    <img className="mobile-app-img" src="img/mobile-app.png" alt="" />
                    <div className="assistant d-flex flex-row justify-content-end">
                        <img className="whatsapp" src="img/whatsapp-logo.svg" alt="whatsapp" />
                        <p className="align-self-end">
                            Have a Question?
                            <span>
                                Ask a Specialis
                            </span></p>
                    </div>
                </div>
            </section>
        )
    }
}

export default AppsLink
