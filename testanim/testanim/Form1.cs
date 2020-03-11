using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace testanim
{
    public partial class Form1 : Form
    {
        FormCollection fc = Application.OpenForms;
        private int _startTop = 12;  // start position of the panel
        private int _endTop = 91; // end position of the panel

        private int _stepSize = 15;        

        private int _panelMove = 0;

        private int _startSizeX = 180;
        private int _startSizeY = 180;
        private int _endSizeX = 300;
        private int _endSizeY = 300;

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_KeyDown(object sender, KeyEventArgs e)
        {
            switch (e.KeyCode)
            {
                case Keys.Down:
                    timerAnim.Enabled = true;


                    break;
            }
        }

        private void TimerAnim_Tick(object sender, EventArgs e)
        {
            if (_panelMove == 0)
            {
                photosPanel.Top = _startTop; 
                photosPanel.Width = _startSizeX;
                photosPanel.Height = _startSizeY;
                _panelMove = 1;
            }

            // incrementally move
            photosPanel.Top += _stepSize;
            photosPanel.Height += _stepSize;
            photosPanel.Width += _stepSize;
            // make sure we didn't over shoot
            if (photosPanel.Top > _endTop) photosPanel.Top = _endTop;

            if (photosPanel.Width > _endSizeX && photosPanel.Height > _endSizeY)
            {
                photosPanel.Width = _endSizeX;
                photosPanel.Height = _endSizeY;
            }

            // have we arrived?
            if (photosPanel.Top == _endTop && photosPanel.Width == _endSizeX && photosPanel.Height == _endSizeY)
            {
                timerAnim.Enabled = false;
                _panelMove = 0;
            }
        }
    }
}
