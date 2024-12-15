import {
  createProfileAction,
  editProfileAction,
  fetchHasProfile,
} from "@/actions/actions";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CreateProfile = async () => {
  const user = await currentUser();
  let mode = "create";
  if (!user) {
    // const { toast } = useToast();
    // toast({ description: "Please login before create profile" });
    redirect("/");
  }
  const hasUser = await fetchHasProfile(user.id);
  if (hasUser) {
    mode = "edit";
  }

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        {mode == "create" ? "Register" : "Profile"}
      </h1>

      <div className="border p-8 rounded-md">
        <FormContainer
          action={mode == "create" ? createProfileAction : editProfileAction}
        >
          {mode == "edit" && (
            <input name="id" value={hasUser?.id} readOnly hidden />
          )}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="fname"
              label="Fist Name"
              type="text"
              placeholder="First Name"
              defaultValue={mode == "create" ? undefined : hasUser?.fname}
            />
            <FormInput
              name="lname"
              label="Last Name"
              type="text"
              placeholder="Last Name"
              defaultValue={mode == "create" ? undefined : hasUser?.lname}
            />
            <FormInput
              name="username"
              label="Username"
              type="text"
              placeholder="Username"
              defaultValue={mode == "create" ? undefined : hasUser?.username}
            />
          </div>
          <SubmitButton
            text={mode == "create" ? "create profile" : "Update Profile"}
            size="lg"
          />
        </FormContainer>
      </div>
    </section>
  );
};
export default CreateProfile;
