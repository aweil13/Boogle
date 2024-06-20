import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
import * as FaIcons from 'react-icons/fa';
import '../../stylesheets/personallinks_modal.css';

function PersonalLinksModal () {
  const dispatch = useDispatch();
  return (
    <div className='personal-links-modal'>
      <div onClick={() => dispatch(closeModal())} className="close-x">X</div>
      <h1 className='developers'>Developers</h1>
      <div className='developers-container'>
        <div className='developer-info'>
          <span>Alejandro Weil</span>
          <div className='icons-container'>
            <a href="https://www.linkedin.com/in/alejandro-weil-b9275720b/" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaLinkedin/></a>
            <a href="https://github.com/aweil13" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaGithub/></a>
            <a href="https://angel.co/u/alejandro-weil" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaAngellist /></a>
            <a href="https://aweil13.github.io/PortfolioSite/" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaAddressCard/></a>
          </div>
        </div>
        <div className='developer-info'>
          <span>Brad Trick</span>
          <div className='icons-container'>
            <a href="https://www.linkedin.com/in/bradley-trick/" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaLinkedin/></a>
            <a href="https://github.com/brtrick" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaGithub/></a>
            <a href="https://angel.co/u/bradley-trick" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaAngellist /></a>
            <a href="https://www.github.io/brtrick/" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaAddressCard/></a>
          </div>
        </div>
        <div className='developer-info'>
          <span>Brekke Green</span>
          <div className='icons-container'>
            <a href="https://www.linkedin.com/in/brekke-andrew-green/" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaLinkedin/></a>
            <a href="https://github.com/Brekke-Green" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaGithub/></a>
            <a href="https://angel.co/u/brekke-andrew-green" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaAngellist /></a>
            <a href="https://brekke-green.github.io/" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaAddressCard/></a>
          </div>
        </div>
        <div className='developer-info'>
          <span>Marco Torre</span>
          <div className='icons-container'>
            <a href="https://www.linkedin.com/in/marco-torre-388286138/" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaLinkedin/></a>
            <a href="https://github.com/OcramT" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaGithub/></a>
            <a href="https://angel.co/u/marco-torre-1" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaAngellist /></a>
            <a href="https://www.marcotorre.io/" className='icons' rel="noreferrer" target="_blank"><FaIcons.FaAddressCard/></a>
          </div>
        </div>
      </div>
      <p className='thank-you-message'>Thanks for Checking Out Disarray!</p>
    </div>
  )
}

export default PersonalLinksModal;
