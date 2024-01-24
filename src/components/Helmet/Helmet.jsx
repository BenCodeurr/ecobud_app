/* eslint-disable react/prop-types */



 const Helmet = (props) => {
    document.title = 'Ecobuddi - ' + props.title;
  return (
    <div className="w-100">{props.children}</div>
  )
}

export default Helmet