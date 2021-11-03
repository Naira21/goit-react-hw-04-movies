import PropTypes from "prop-types";

const ImageGalleryItem = ({ title }) => {
  return (
    <li className="ImageGalleryItem" >
      {title}
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  pictUrl: PropTypes.string,
  photographer: PropTypes.string,
  onClick: PropTypes.func,
};
