export const arrayToFormData = (data: any) => {
    let formData = new FormData();

    for (let prop in data) {

        if (Array.isArray(data[prop])) {
            for (let index in data[prop]) {
                if (!(data[prop][index] instanceof File) && typeof data[prop][index] == "object") {
                    for (let p in data[prop][index]) {
                        formData.append(prop + "[" + index + "][" + p + "]", data[prop][index][p]);
                    }
                } else
                    formData.append(prop + "[]", data[prop][index]);
            }
        } else {
            formData.append(prop, data[prop]);
        }
    }

    return formData;

};