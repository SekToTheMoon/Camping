import {
  createLandmarkAction,
  editLandmark,
  fetchLandmarkDetail,
} from "@/actions/actions";
import { SubmitButton } from "@/components/form/Buttons";
import CategoryInput from "@/components/form/CategoryInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import ProvinceInput from "@/components/form/ProvinceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import MapLandmark from "@/components/map/MapLandmark";
type SearchParams = Promise<{ [edit: string]: string | undefined }>;
const CreateProfile = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { edit } = await searchParams;
  let landmark;
  if (edit) {
    landmark = await fetchLandmarkDetail({ id: edit });

    // console.log("create", landmark);
  }
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        {edit ? "Edit Landmark" : "Create Landmark"}
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={edit ? editLandmark : createLandmarkAction}>
          {edit && <input name="id" hidden defaultValue={edit} readOnly />}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="name"
              label="Landmark Name"
              type="text"
              placeholder="Landmark Name"
              defaultValue={landmark?.name}
            />
            {/* Category */}
            <CategoryInput defaultValue={landmark?.category} />
          </div>
          <TextAreaInput
            name="description"
            defaultValue={landmark?.description}
          />
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="price"
              label="Price"
              type="number"
              placeholder="Price"
              defaultValue={landmark?.price.toString()}
            />
            <ProvinceInput defaultValue={landmark?.province} />
          </div>

          <ImageInput
            defaultImage={landmark?.image}
            edit={edit ? true : false}
          />

          <MapLandmark
            location={
              landmark?.lat !== undefined && landmark?.lng !== undefined
                ? { lat: landmark.lat, lng: landmark.lng }
                : undefined
            }
          />

          <SubmitButton text={edit ? "submit" : "create Landmark"} size="lg" />
        </FormContainer>
      </div>
    </section>
  );
};
export default CreateProfile;
