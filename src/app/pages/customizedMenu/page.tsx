'use client'

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

const DynamicForm = () => {
  const { control, handleSubmit, watch, setValue } = useForm();
  const selectedMenu = watch('menu') || [];

  // Options for each menu item (can be fetched from a server or defined here)
  const menuOptions = [
    { label: 'Carbs', value: 'carb' },
    { label: 'Protein', value: 'protein' },
    { label: 'Vitamins & Minerals', value: 'vitamins&minerals' },
  ];

  // Dynamic field data for each menu option
  const carbOptions = ['Rice', 'Potato'];
  const proteinOptions = ['Chicken', 'Beef'];
  const vitaminsOptions = ['Vitamin A', 'Vitamin B'];

  // Submit function to capture form data
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div>
          <label>Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <input {...field} />}
          />
        </div>

        {/* Menu Multi-Select Field */}
        <div>
          <label>Menu</label>
          <Controller
            name="menu"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={menuOptions}
                onChange={(selectedOptions: any) => {
                  setValue('menu', selectedOptions.map((item: any) => item.value));
                }}
                getOptionLabel={(e: any) => e.label}
                getOptionValue={(e: any) => e.value}
              />
            )}
          />
        </div>

        {/* Order Type (Take Away / Dine In) */}
        <div>
          <label>Order Type</label>
          <Controller
            name="ordertype"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="takeaway">Take Away</option>
                <option value="dinein">Dine In</option>
              </select>
            )}
          />
        </div>

        {/* Dynamic fields for selected menu items */}
        {selectedMenu.includes('carb') && (
          <div>
            <h3>Carb Options</h3>
            <div>
              <label>Carb Type</label>
              <Controller
                name="carbType"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    {carbOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div>
              <label>Portion</label>
              <Controller
                name="carbPortion"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                )}
              />
            </div>
            <div>
              <label>Grams of Salt</label>
              <Controller
                name="carbSalt"
                control={control}
                render={({ field }) => <input type="number" {...field} />}
              />
            </div>
          </div>
        )}

        {selectedMenu.includes('protein') && (
          <div>
            <h3>Protein Options</h3>
            <div>
              <label>Protein Type</label>
              <Controller
                name="proteinType"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    {proteinOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div>
              <label>Protein Portion</label>
              <Controller
                name="proteinPortion"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                )}
              />
            </div>
          </div>
        )}

        {selectedMenu.includes('vitamins&minerals') && (
          <div>
            <h3>Vitamins & Minerals</h3>
            <div>
              <label>Vitamins Type</label>
              <Controller
                name="vitaminType"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    {vitaminsOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;

