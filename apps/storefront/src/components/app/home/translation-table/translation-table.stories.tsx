import { Meta, StoryObj } from '@storybook/react'

import { TranslationTable } from './translation-table'
import { flattenTranslationObject, mergeTranslationsForTable } from './utils'

const meta: Meta<typeof TranslationTable> = {
  title: 'Components/Translation/TranslationTable',
  component: TranslationTable
}

export default meta

type Story = StoryObj<typeof TranslationTable>

const frenchTranslations = {
  test: {
    screen: 'bonjour tout le monde'
  },
  screen: {
    title: 'salut'
  },
  doctor_profile: {
    name: 'Dr. Joseph Brostito',
    specialty: 'Médecin généraliste',
    distance: '1,2 KM',
    reviews: '4,8 (120 avis)',
    open_time: 'Ouvert à 17h00'
  },
  appointment: {
    date: 'Dimanche 12 juin',
    time: '11:00 - 12:00 AM'
  },
  health_info: {
    covid_title: 'Covid 19',
    doctor_label: 'Médecin',
    medicine_label: 'Médicament',
    hospital_label: 'Hôpital'
  },
  doctor_listing: {
    nearby_doctors_title: 'Médecins à proximité'
  },
  greeting: {
    user: 'Salut Antoine'
  },
  time: {
    current: '9:41'
  },
  navigation: {
    home: 'Accueil'
  },
  appointments: {
    screen: {
      availabilities: 'Disponibilités',
      cancelled: 'Rendez-vous annulés',
      upcoming: 'Rendez-vous à venir',
      attended: 'Rendez-vous assistés',
      doctor_name: {
        '1': 'Dr. Joseph Brostito',
        '2': 'Dr. Bessie Coleman',
        '3': 'Dr. Babe Didrikson'
      },
      specialization: {
        '1': 'Spécialiste dentaire',
        '2': 'Spécialiste dentaire',
        '3': 'Spécialiste dentaire'
      },
      date: {
        '1': 'Dimanche 12 juin',
        '2': 'Dimanche 12 juin',
        '3': 'Dimanche 12 juin'
      },
      time: {
        '1': '11:00 - 12:00 AM',
        '2': '11:00 - 12:00 AM',
        '3': '11:00 - 12:00 AM'
      },
      book_now: {
        '1': 'Réservez maintenant',
        '2': 'Réservez maintenant'
      },
      detail: 'Détails',
      search_placeholder: 'Chercher un médecin ou un problème de santé',
      current_time: '9:41'
    }
  }
}

const englishTranslations = {
  test: {
    screen: 'hello world'
  },
  doctor_profile: {
    name: 'Dr. Joseph Brostito',
    specialty: 'General Doctor',
    distance: '1.2 KM',
    reviews: '4,8 (120 Reviews)',
    open_time: 'Open at 17.00'
  },
  appointment: {
    date: 'Sunday, 12 June',
    time: '11:00 - 12:00 AM'
  },
  health_info: {
    covid_title: 'Covid 19',
    doctor_label: 'Doctor',
    medicine_label: 'Medicine',
    hospital_label: 'Hospital'
  },
  doctor_listing: {
    nearby_doctors_title: 'Doctors nearby'
  },
  greeting: {
    user: 'Hi Antoine'
  },
  time: {
    current: '9:41'
  },
  navigation: {
    home: 'Home'
  },
  appointments: {
    screen: {
      availabilities: 'Availabilities',
      cancelled: 'Cancelled appointments',
      upcoming: 'Upcoming appointments',
      attended: 'Attented apointments',
      doctor_name: {
        '1': 'Dr. Joseph Brostito',
        '2': 'Dr. Bessie Coleman',
        '3': 'Dr. Babe Didrikson'
      },
      specialization: {
        '1': 'Dental Specialist',
        '2': 'Dental Specialist',
        '3': 'Dental Specialist'
      },
      date: {
        '1': 'Sunday, 12 June',
        '2': 'Sunday, 12 June',
        '3': 'Sunday, 12 June'
      },
      time: {
        '1': '11:00 - 12:00 AM',
        '2': '11:00 - 12:00 AM',
        '3': '11:00 - 12:00 AM'
      },
      book_now: {
        '1': 'Book now',
        '2': 'Book now'
      },
      detail: 'Detail',
      search_placeholder: 'Search doctor or health issue',
      current_time: '9:41'
    }
  }
}

const flattenFrenchTranslations = flattenTranslationObject(frenchTranslations)

export const Default: Story = {
  args: {
    data: mergeTranslationsForTable(flattenFrenchTranslations, {
      'fr-fr': frenchTranslations,
      'en-us': englishTranslations
    }),
    availableLocales: ['fr-fr', 'en-us'],
    onTranslationChange: (id, locale, value) => {
      console.log(`Translation changed for ${id} in ${locale}: ${value}`)
    }
  }
}

export const Empty: Story = {
  args: {
    data: [],
    availableLocales: []
  }
}
