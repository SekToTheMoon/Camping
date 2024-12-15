import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";

// rafce
const ProfilePage = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
      <div className="border p-8 rounded-md">
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <FormInput
            name="fname"
            label="Fist Name"
            type="text"
            placeholder="First Name"
          />
          <FormInput
            name="lname"
            label="Last Name"
            type="text"
            placeholder="Last Name"
          />
          <FormInput
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
          />
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
