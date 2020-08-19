import React from 'react';
import { Container } from 'reactstrap';
import { FaStar } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';


const DetailCard = ({data}) => {
    const {state} = useLocation()
    return (
        <Container>
            <h3 className="text-center text-light my-5">Detail {state.from === 'movie' ? 'Movie' : 'Serie'}</h3>
            <div className="d-flex my-3 cardStyle">
                <div>
                    <img className="img-card" src={data.poster_path} alt="gambar"/>
                </div>
                <div style={{padding: '20px'}}>
                    <h4>{data.title}</h4>
                    <span style={{fontSize: '20px'}}><FaStar color="gold"/> {data.popularity}</span>
                    <p className="mt-2" style={{wordBreak: "break-all"}}>{data.overview}</p>
                    <div style={{wordBreak: "break-all"}}>
                        {
                            data.tags.map((tag, idx) => (
                                <span className="tagStyle" key={idx}>{tag}</span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default DetailCard