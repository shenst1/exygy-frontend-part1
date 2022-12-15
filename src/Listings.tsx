import { Badge } from "./components/Badge"
import "./components/DataTable.scss"
import { ImageBlock } from "./components/ImageBlock"
import "./components/Listing.scss"
import mockData from "./mock-data.json"

export type Address = {
  city: string
  state: string
  street: string
  zipCode: string
}

export interface UnitTableRow {
  minIncomeMaximum: number
  minIncomeMinimum: number
  rentMaximum: number
  rentMinimum: number
  rentUnit: "percentage" | "currency" | ""
  type: "studio" | "oneBdrm" | "twoBdrm" | "threeBdrm" | "fourBdrm"
}

export interface Listing {
  address: Address
  deadline: string
  id: string
  imageLabels: string[]
  imageURL: string
  listingLabels: string[]
  name: string
  unitTableData: UnitTableRow[]
}

export const Listings = () => {
  const listingData = mockData as Listing[]
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
  const translations = {
    studio: "Studio",
    oneBdrm: "1 BR",
    twoBdrm: "2 BR",
    threeBdrm: "3 BR",
    fourBdrm: "4 BR",
  }
  // Please use this component as the root of your solution
  return (
    <div className="main">
      {listingData.map(
        ({ name, deadline, address, imageLabels, imageURL, listingLabels, unitTableData }) => (
          // TODO: Could make a component called Listing, but i'm not usually a huge fan of components with knowledge of the application
          // I would prefer building the listing out of components like Stack, Card, TextStyle, Badge, DataTable, TextContainer
          // With more time, that is probably how I wouild structure it.
          <div className="listing">
            <ImageBlock deadline={deadline} labels={imageLabels} imageURL={imageURL} />
            <div className="listing-data">
              <h3 className="listing-title">{name}</h3>
              <div className="listing-subtitle">
                {address.street}, {address.city} {address.state} {address.zipCode}
              </div>
              {listingLabels.length !== 0 && (
                <div className="listing-badges">
                  {listingLabels.map((label) => (
                    <Badge>{label}</Badge>
                  ))}
                </div>
              )}
              <hr className="hr" />
              {/* TODO: Could make DataTable component */}
              <table>
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Minimum income</td>
                    <td>Rent</td>
                  </tr>
                </thead>
                {unitTableData.map((unit) => {
                  const isCurrency = unit.rentUnit === "currency" || unit.rentUnit === ""

                  if (isCurrency) {
                    return (
                      <tr>
                        <td>{translations[unit.type]}</td>
                        <td>{formatter.format(unit.minIncomeMinimum)} per month</td>
                        <td>
                          {unit.rentMinimum === unit.rentMaximum
                            ? formatter.format(unit.rentMinimum)
                            : `${formatter.format(unit.rentMinimum)} - ${formatter.format(
                                unit.rentMaximum
                              )}`}{" "}
                          per month
                        </td>
                      </tr>
                    )
                  } else {
                    return (
                      <tr>
                        <td>{translations[unit.type]}</td>
                        <td>$0 per month</td>
                        <td>
                          {unit.rentMinimum === unit.rentMaximum
                            ? `${unit.rentMinimum}%`
                            : `${unit.rentMinimum}% - ${unit.rentMaximum}%`}{" "}
                          income
                        </td>
                      </tr>
                    )
                  }
                })}
              </table>
            </div>
          </div>
        )
      )}
    </div>
  )
}
