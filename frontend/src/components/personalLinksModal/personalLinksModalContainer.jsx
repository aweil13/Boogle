import {connect} from 'react-redux';
import {closeModal} from '../../actions/modal_actions';
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import '../../stylesheets/personallinks_modal.css';

const PersonalLinksModal = ({closeModal}) => {
    return (
        <div className='personal-links-modal'>
            <div onClick={closeModal} className="close-x">X</div>
            <h1 className='developers'>Developers</h1>
            <div className='developers-container'>
                <div className='developer-info'>
                    <span>Alejandro Weil</span>
                    <div className='icons-container'>
                        <a href="https://www.linkedin.com/in/alejandro-weil-b9275720b/" className='icons' target="_blank"><FaIcons.FaLinkedin/></a>
                        <a href="https://github.com/aweil13" className='icons' target="_blank"><FaIcons.FaGithub/></a>
                        <a href="https://angel.co/u/alejandro-weil" className='icons' target="_blank"><FaIcons.FaAngellist /></a>
                        <a href="https://aweil13.github.io/PortfolioSite/" className='icons' target="_blank"><FaIcons.FaAddressCard/></a>
                    </div>
                </div>
                <div className='developer-info'>
                    <span>Marco Torre</span>
                    <div className='icons-container'>
                        <a href="https://www.linkedin.com/in/marco-torre-388286138/" className='icons' target="_blank"><FaIcons.FaLinkedin/></a>
                        <a href="https://github.com/OcramT" className='icons' target="_blank"><FaIcons.FaGithub/></a>
                        <a href="https://angel.co/u/marco-torre-1" className='icons' target="_blank"><FaIcons.FaAngellist /></a>
                        <a href="https://www.marcotorre.io/" className='icons' target="_blank"><FaIcons.FaAddressCard/></a>
                    </div>
                </div>
                <div className='developer-info'>
                    <span>Brad Trick</span>
                    <div className='icons-container'>
                        <a href="https://www.linkedin.com/in/bradley-trick/" className='icons' target="_blank"><FaIcons.FaLinkedin/></a>
                        <a href="https://github.com/brtrick" className='icons' target="_blank"><FaIcons.FaGithub/></a>
                        <a href="https://angel.co/u/bradley-trick" className='icons' target="_blank"><FaIcons.FaAngellist /></a>
                        <a href="https://www.github.io/brtrick/" className='icons' target="_blank"><FaIcons.FaAddressCard/></a>
                    </div>
                </div>
                <div className='developer-info'>
                    <span>Brekke Green</span>
                    <div className='icons-container'>
                        <a href="https://www.linkedin.com/in/brekke-andrew-green/" className='icons' target="_blank"><FaIcons.FaLinkedin/></a>
                        <a href="https://github.com/Brekke-Green" className='icons' target="_blank"><FaIcons.FaGithub/></a>
                        <a href="https://angel.co/u/brekke-andrew-green" className='icons' target="_blank"><FaIcons.FaAngellist /></a>
                        <a href="https://brekke-green.github.io/" className='icons' target="_blank"><FaIcons.FaAddressCard/></a>
                    </div>
                </div>
            </div>
            <p className='thank-you-message'>Thanks for Checking Out Disarray!</p>
        </div>
    )
}




const mSTP = state => (
    {}
);

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(PersonalLinksModal)