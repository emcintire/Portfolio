import React from "react";
import "./Games.css";

function Games() {
    // eslint-disable-next-line
    function appLauncher(app) {
        var appSource = "http://website.com/apps/" + app + ".html";

        document.getElementById(app).innerHTML =
            "<pre><iframe id=" +
            app +
            " name=" +
            app +
            " src=" +
            appSource +
            "></iframe></pre>";
    }

    return (
        <>
            <div id="games-container">
                {/* <div
                    id="pyjsdl_demo"
                    title="App: Pyjsdl Demo"
                    class="jsapp_box"
                >
                    <input
                        type="button"
                        value="Launch"
                        onClick={appLauncher("pyjsdl_demo")}
                    />

                    <div class="app_title">Pyjsdl Demo</div>
                </div> */}
            </div>
        </>
    );
}

export default Games;
