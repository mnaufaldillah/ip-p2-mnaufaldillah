import PropTypes from 'prop-types';

function Header({title}) {
    return (
        <div className="mb-3 p-3 text-center">
            <h1>{title}</h1>
        </div>
    )
}

Header.propTypes = {
    title: PropTypes.node,
}

export default Header;