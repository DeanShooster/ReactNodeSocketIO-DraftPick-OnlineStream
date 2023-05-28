
import { Data } from "./Data";
import { IPickNBan } from "../..";
import { Controller } from "./Controller";

import './index.scss';
import { Divider } from "../../../Divider";

interface ISettingsController{
    pickNban: IPickNBan;
    updateSetting: Function;
}

export const SettingsController = ({pickNban,updateSetting} : ISettingsController) => {
    return (
        <div className="settings-controller-container">
            <Data pick={pickNban.pick} ban={pickNban.ban}/>
            <Divider />
            <Controller pickRange={pickNban.pickRange} banRange={pickNban.banRange} updateSetting={updateSetting}/>
        </div>
    );
}