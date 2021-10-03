import React, { useEffect } from 'react';
import BackArrow from '../../../../../Buttons/BackArrow';

function Rio8m() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div id="portraits-container">
                <BackArrow />
                <h1 className="photos-header">Rio 8 months</h1>

                <section id="photos">
                    <img
                        src="https://i.imgur.com/REfswYeh.jpg"
                        alt="Infant smiling"
                    />
                    <img
                        src="https://i.imgur.com/h4rSEp3h.jpg"
                        alt="Toddler holding baby cousin"
                    />
                    <img
                        src="https://i.imgur.com/MfqIXd0h.jpg"
                        alt="Mom kissing infant"
                    />
                    <img
                        src="https://i.imgur.com/nnBsIuFh.jpg"
                        alt="Mom kissing infant"
                    />
                    <img
                        src="https://i.imgur.com/nALH0eBh.jpg"
                        alt="Mom holding infant"
                    />
                    <img
                        src="https://i.imgur.com/JDCHePTh.jpg"
                        alt="Mom holding infant"
                    />
                    <img
                        src="https://i.imgur.com/fqh3oAqh.jpg"
                        alt="Mom holding toddler and infant"
                    />
                    <img
                        src="https://i.imgur.com/PtPI4XEh.jpg"
                        alt="Mom holding toddler and infant"
                    />
                    <img
                        src="https://i.imgur.com/sTjyA4Qh.jpg"
                        alt="Mom holding toddler and infant"
                    />
                    <img
                        src="https://i.imgur.com/K08MdmVh.jpg"
                        alt="Mom kissing infant"
                    />
                    <img
                        src="https://i.imgur.com/cZQXjh8h.jpg"
                        alt="Mom holding infant"
                    />
                    <img
                        src="https://i.imgur.com/ey8qrgkh.jpg"
                        alt="Mom holding infant"
                    />
                </section>
            </div>
        </>
    );
}

export default Rio8m;
