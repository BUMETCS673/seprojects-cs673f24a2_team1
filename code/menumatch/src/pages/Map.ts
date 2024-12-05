import "./style.css";
import MapImage from "../images/image.png";

const Map = () => {

    return (
        <>
            <div>Header</div>
            <div className="map_wrapper">
                <div className="map_image">
                    <img src={MapImage} alt="map_image" />
                </div>
                <div className="restaurant_list">
                    <div className="restaurant_card">
                        <img className="restaurant_image" src={MapImage} />
                        <span className="resautant_name">Restaurant 1</span>
                        <span className="resautant_demographics">Location | *****</span>
                    </div>

                    <div className="restaurant_card">
                        <img className="restaurant_image" src={MapImage} />
                        <span className="resautant_name">Restaurant 1</span>
                        <span className="resautant_demographics">Location | ***</span>
                    </div>

                    <div className="restaurant_card">
                        <img className="restaurant_image" src={MapImage} />
                        <span className="resautant_name">Restaurant 1</span>
                        <span className="resautant_demographics">Location | ****</span>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Map;