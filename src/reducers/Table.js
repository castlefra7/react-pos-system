import { CHANGE_TABLE, GET_ALL_TABLES } from '../actions';

const table = (state = 
    {
        idCurrentTable: "", 
        textCurrentTable: "",
        data: [ ]
    }
    , action) => {
    switch (action.type) {
        case GET_ALL_TABLES:
            const newData = [];
            action.data.forEach((place) => {
                const newPlace = {};
                newPlace["key"] = place.placeID;
                newPlace["value"] = place.placeID;
                newPlace["text"] = place.placeName;
                newData.push(newPlace);
            });

            return {...state, data: newData};
        case CHANGE_TABLE:
            const newState = { ...state };
            console.log(state.textCurrentTable);
            newState["idCurrentTable"] = action.idTable.id.toString();
            newState["textCurrentTable"] = action.idTable.text;
            return newState;
        default:
            return state;
    }
}

export default table;