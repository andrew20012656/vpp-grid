import { useState } from 'react';

export function useEquipmentDetail() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const showEquipmentDetail = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const hideEquipmentDetail = () => {
    setSelectedEquipment(null);
  };

  return {
    selectedEquipment,
    showEquipmentDetail,
    hideEquipmentDetail
  };
}
