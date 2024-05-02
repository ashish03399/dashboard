export const STATE = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
    BLOCKED: 'Blocked',
    DEFFERED: 'Deffered',
    TESTING: 'Testing'
}

export const WORKFLOW_RULES = {
    [STATE.TODO]: [STATE.IN_PROGRESS, STATE.BLOCKED, STATE.DEFFERED],
    [STATE.IN_PROGRESS]: [STATE.DONE, STATE.BLOCKED, STATE.DEFFERED, STATE.TESTING],
    [STATE.DONE]: [],
    [STATE.BLOCKED]: [STATE.TODO, STATE.IN_PROGRESS, STATE.TESTING],
    [STATE.DEFFERED]: [STATE.TODO],
    [STATE.TESTING]: [STATE.DONE, STATE.BLOCKED]
}

export const fields = {
    'taskId': {
        fieldName: 'taskId',
        reqInAllStages: true,
        autogenrate: true,
        type:'String',
        filter: true,
    },
    'name': {
        fieldName: 'name',
        reqInAllStages: true,
        type:'String',
        label: 'Name',
        filter: true,
    },
    'column': {
        fieldName: 'column',
        reqInAllStages: true,
        type:'String'
    },
    'description': {
        fieldName: 'description',
        reqInAllStages: true,
        label: 'Description',
        type:'String',
        filter: true,
    },
    'deadline': {
        fieldName: 'deadline',
        reqInAllStages: true,
        label: 'Deadline',
        type:'Date',
        filter: true,
    },
    'testingDate': {
        fieldName: 'testingDate',
        requiredStages: [STATE.TESTING, STATE.DONE],
        label: 'Testing Date',
        type:'Date'
    },
    'completionDate': {
        fieldName: 'completionDate',
        label: 'Completion Date',
        requiredStages: [STATE.DONE],
        type:'Date'
    },
    'startDate': {
        fieldName: 'startDate',
        label: 'Start Date',
        requiredStages: [STATE.IN_PROGRESS, STATE.DONE],
        type:'Date'
    }
}

const getStagesKey = () => {
    return Object.keys(STATE);
}

export const getFieldsKey = () => {
    return Object.keys(fields);
}

export const getFields = () => {
    return fields;
}

const getStages = () => {
    return STATE;
}

let stage_obj;
export const getReqFieldStage = (stage) => {
    if(!stage_obj){
        const fieldsArr = getFieldsKey();
        const allStages = getStagesKey();
        const allStagesValue = getStages();
        const fields = getFields();
        stage_obj = allStages.reduce((prevFieldObj, currStage) => {
            for(let i = 0; i < fieldsArr.length; i++){
                if(prevFieldObj[allStagesValue[currStage]] && prevFieldObj[allStagesValue[currStage]]?.mandateFields){
                    if(fields[fieldsArr[i]].reqInAllStages || fields[fieldsArr[i]].requiredStages?.includes(allStagesValue[currStage])){
                        prevFieldObj[allStagesValue[currStage]].mandateFields.push(fieldsArr[i]);
                    }
                }else{
                    if(!prevFieldObj[allStagesValue[currStage]]){
                        prevFieldObj[allStagesValue[currStage]] = {};
                    }
                    prevFieldObj[allStagesValue[currStage]].mandateFields = [fieldsArr[i]];
                }                
            }
            return prevFieldObj;
        }, {});
    }

    return stage ? stage_obj[stage]: stage_obj;
}

console.log('Ashish Stages --> ', getReqFieldStage());