import "./History.css";

export function Singletour({ data, tourname, index }) {
    return (
        <>
            <h3 className="tourhistoryheaders">{tourname[index]}</h3>
            <div className="historycontent">
                {data.map((data, index) => (
                    <>
                        <h5>Day:{data.day}</h5>
                        <div className="singledaycontent">
                            <h6>
                                <span>Ocassion Type:</span>
                                {data.type}
                            </h6>
                            <h6>
                                <span>Your preferred top color:</span>
                                {data.top}
                            </h6>
                            <h6>
                                <span>Your preferred bottom color:</span>
                                {data.bottom}
                            </h6>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
}
