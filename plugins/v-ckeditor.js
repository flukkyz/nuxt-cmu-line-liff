import Vue from 'vue'
import CKEditor from '@blowstack/ckeditor-nuxt'

Vue.component('CkEditor', CKEditor)

export default ({ app }, inject) => {
  inject('ckConfig', (uploadConfig) => {
    return {
      toolbar: [
        'undo',
        'redo',
        '|',
        'heading',
        '|',
        'alignment',
        '|',
        'fontFamily',
        'fontSize',
        'fontColor',
        'fontBackgroundColor',
        'bold',
        'italic',
        'underline',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'horizontalLine',
        'blockQuote',
        'link',
        'insertTable',
        'uploadImage',
        'mediaEmbed'
      ],
      removePlugins: ['Title'],
      link: {
        addTargetToExternalLinks: true
      },
      mediaEmbed: {
        previewsInData: true
      },
      image: {
        styles: [
          'alignLeft', 'alignCenter', 'alignRight'
        ],
        resizeOptions: [
          {
            name: 'resizeImage:original',
            value: null,
            icon: 'original'
          },
          {
            name: 'resizeImage:50',
            value: '50',
            icon: 'medium'
          },
          {
            name: 'resizeImage:75',
            value: '75',
            icon: 'large'
          }
        ],
        toolbar: [
          '|',
          'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
          '|',
          'resizeImage:50',
          'resizeImage:75',
          'resizeImage:original',
          '|',
          'linkImage'
        ]
      },
      simpleUpload: uploadConfig
    }
  })
}
