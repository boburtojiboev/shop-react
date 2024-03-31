import { CloudDownload } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { verifiedMemberData } from "../../apiServices/verify";
import { MemberUpdateData } from "../../../types/user";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";

export function MySettings() {
  /** INITIALIZATIONS **/
  const [file, setFile] = useState(verifiedMemberData?.mb_image);
  const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
    mb_nick: "",
    mb_phone: "",
    mb_address: "",
    mb_description: "",
    mb_image: "",
  });

  //** HANDLERS**//
  const changeMemberNickHandler = (e: any) => {
    memberUpdate.mb_nick = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const changeMemberPhoneHandler = (e: any) => {
    memberUpdate.mb_phone = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const changeMemberAddressHandler = (e: any) => {
    memberUpdate.mb_address = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const changeMemberDescriptionHandler = (e: any) => {
    memberUpdate.mb_description = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const handleImagePreviewer = (e: any) => {
    try {
      const file = e.target.files[0];

      const file_type = file["type"],
        valid_types = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
      assert.ok(valid_types.includes(file_type) && file, Definer.input_err2);

      memberUpdate.mb_image = file;
      setMemberUpdate({ ...memberUpdate });
      setFile(URL.createObjectURL(file));
    } catch (err: any) {
      console.log(`ERROR::: handleImagePreviewer ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const handleSubmitButton = async () => {
    try {
      const memberService = new MemberApiService();
      console.log("memberUpdate:", memberUpdate);
      const result = await memberService.updateMemberData(memberUpdate);

      assert.ok(result, Definer.general_err1);
      await sweetTopSmallSuccessAlert(
        "Information modified successfully",
        700,
        false
      );
      window.location.reload();
    } catch (err) {
      console.log(`ERROR::: handleSubmitButton ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack className="my_settings_page">
      <Box className="member_media_frame">
        <img
          src={file}
          alt=""
          className="mb_image"
          width={"100px"}
          height={"100px"}
          style={{ borderRadius: "50%" }}
        />
        <div className="media_change_box">
          <span>Rasm Yuklash</span>
          <p>You can only upload JPG, JPEG, PNG formats!</p>
          <div className="up_del_box">
            <Button
              component="label"
              style={{ minWidth: "0" }}
              onChange={handleImagePreviewer}
            >
              <CloudDownload />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className="input_frame">
        <div className="long_input">
          <label className="spec_label">Name</label>
          <input
            type="text"
            className="spec_input mb_nick"
            placeholder={verifiedMemberData?.mb_nick}
            name="mb_nick"
            onChange={changeMemberNickHandler}
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="short_input">
          <label className="spec_label">Phone number</label>
          <input
            type="text"
            placeholder={verifiedMemberData?.mb_phone}
            name="mb_phone"
            className="spec_input mb_phone"
            onChange={changeMemberPhoneHandler}
          />
        </div>
        <div className="short_input">
          <label className="spec_label">Address</label>
          <input
            type="text"
            placeholder={
              verifiedMemberData?.mb_address ?? "manzil kiritilmagan"
            }
            name="mb_address"
            className="spec_input mb_address"
            onChange={changeMemberAddressHandler}
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="long_input">
          <label className="spec_label">Information</label>
          <textarea
            placeholder={verifiedMemberData.mb_description ?? "No informations"}
            name={"description"}
            className={"spec_textarea mb_description"}
            onChange={changeMemberDescriptionHandler}
          />
        </div>
      </Box>
      <Box display="flex" justifyContent={"flex-end"} sx={{ mt: "25px" }}>
        <Button variant="contained" onClick={handleSubmitButton}>
          Save
        </Button>
      </Box>
    </Stack>
  );
}
