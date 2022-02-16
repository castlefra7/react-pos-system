class Auth {

    login(password, cb) {
        if(password === "los1_2*2*") {
            sessionStorage.setItem("isAuthenticated", "true");
            cb({loggedIn: true});
        } else {
            sessionStorage.setItem("isAuthenticated", "false");
            cb({loggedIn: false});
        }
    }

    logout(cb) {
        sessionStorage.setItem("isAuthenticated", "false");
        cb();
    }

    isAuthenticated() {
        const isAuthenticated = sessionStorage.getItem("isAuthenticated");
        if(isAuthenticated === null) {
            return false;
        }
        return isAuthenticated === "true";
    }
}

export default new Auth();
