import {PlayerSkills} from "@/types/Player";
import Image, {StaticImageData} from "next/image";
import React, {useId} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "@/state";
import NumberInput from "@/app/components/generic/NumberInput";

interface SkillInputProps {
  name: string;
  field: keyof PlayerSkills;
  image: string | StaticImageData;
}

const SkillInput: React.FC<SkillInputProps> = observer((props) => {
  const store = useStore();
  const {player} = store;
  const {name, field, image} = props;
  const id = useId();

  return (
    <>
      <div className={'text-sm'}>
        <Image src={image} alt={name}/>
      </div>
      <div className={'flex justify-center items-center'}>
        <div className={'text-sm font-mono w-8 text-right'}>
          {player.skills[field] + player.boosts[field]}/
        </div>
        <div>
          <NumberInput
            className={'form-control w-12'}
            id={id}
            required
            min={1}
            max={199}
            title={`Your base ${name} level`}
            value={player.skills[field]}
            onChange={(v) => {
              store.updatePlayer({
                skills: {
                  [field]: v
                }
              })
            }}
          />
        </div>
      </div>
    </>
  )
})

export default SkillInput;
