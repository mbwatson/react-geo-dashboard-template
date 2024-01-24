const fs = require('fs')
const path = require('path')
const { faker } = require('@faker-js/faker')
const states = require('./states.js')
const arg = require('arg')

const args = arg({
  // types
  '--verbose': Boolean,
  '--pretend': Boolean,
  '--number': Number,
  // aliases
  '-v': '--verbose',
  '-p': '--pretend',
  '-n': '--number',
})

let COUNT = 1
let VERBOSE_MODE = false
let WRITE_MODE = true
// overwrite defaults as available
if (args['--number'] > 0) {
	COUNT = args['--number']
}
if (args['--verbose']) {
  VERBOSE_MODE = true
}
if (args['--pretend']) {
  WRITE_MODE = false
}

//

const testContentPath = path.join('./src', 'content')
const testContentFile = path.join(testContentPath, 'test-data.json')

function generateRecord() {
	const dataset = faker.word.noun({ min: 4, max: 8 })
	const medium = faker.helpers.arrayElement(['Water', 'Dust', 'Serum'])
	const sampleCount = faker.number.int({ min: 1, max: 100 })
	const targetOrNta = faker.helpers.arrayElement(['Target', 'NTA'])
	const state = faker.location.state({ abbreviated: true })
	const city = faker.location.city()
	const zipCode = faker.location.zipCode(state)
	const lat = faker.location.latitude({ min: states[state].ymin, max: states[state].ymax })
	const long = faker.location.latitude({ min: states[state].xmin, max: states[state].xmax })
	const sampleDate = faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: new Date().toISOString() })
	const analysisDate = faker.date.between({ from: sampleDate, to: new Date().toISOString() })
	const chemicalName = faker.string.alpha({ length: { min: 4, max: 8 }, casing: 'upper' })
	const dtxsID = 'DTXSID' + faker.number.int({ min: 1000000, max: 9999999 })
	const chemicalFormula = faker.string.alphanumeric({ length: { min: 5, max: 10 }, casing: 'upper' })
	const molecularMass = faker.number.float({ min: 10, max: 1000, fractionDigits: 6 })
	const retentionTime = faker.number.float({ min: 1, max: 10 })
	const idConfidenceLevel = faker.helpers.arrayElement([
		'1',
		'2a (library spectrum match)',
		'2b (de novo spectral assignment, single structure matches)',
		'4 (known formula',
	])
	const abundance = faker.number.float({ min: 5, max: 1500000 })
	const units = faker.helpers.arrayElement([
		'ng/ml',
		'ng/g',
		'ng/L',
		'Instrument Abundance',
	])
	const mrlOrD = faker.number.float({ min: 0.1 , max: 10000, fractionDigits: 1 })
	
  return {
		"Dataset": dataset,
		"Medium": medium,
		"Samp #": sampleCount,
		"Target/NTA": targetOrNta,
		"State": state,
		"City": city,
		"ZIP": zipCode,
		"Lat": lat,
		"Long": long,
		"Sample Datetime": sampleDate,
		"Analysis Datetime": analysisDate,
		"Chemical Name": chemicalName,
		"DTXSID": dtxsID,
		"Chemical Formula": chemicalFormula,
		"Molecular Mass": molecularMass,
		"Retention Time": retentionTime,
		"ID Confidence Level (Schyhmanski scale)": idConfidenceLevel,
		"Abundance": abundance,
		"Units": units,
		"MRL or D": mrlOrD,
  }
}

const data = faker.helpers.multiple(generateRecord, { count: COUNT })

fs.writeFileSync(testContentFile, JSON.stringify(data, null, 2))

VERBOSE_MODE &&
  console.log(
    'VERBOSE_MODE=true\n',
    JSON.stringify(data, null, 2)
  )

console.log(`| successfully wrote ${ COUNT } records to ${testContentPath}.`)

if (WRITE_MODE) {
  // ensure the content location exists before proceeding.
  if (!fs.existsSync(testContentPath)) {
    fs.mkdirSync(testContentPath, { recursive: true })
  }
  // write new data
  fs.writeFileSync(testContentFile, JSON.stringify(data, null, 2))
} else {
  console.log('WRITE_MODE=false: no test data was written.')
}