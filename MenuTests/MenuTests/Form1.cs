using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MenuTests
{
    public partial class Form1 : Form
    {
        private string[] imgPaths;
        private readonly string folderPath = @"C:\Dev\Ydays-Arcade\MenuTests\MenuTests\img";
        private int index1 = 0;
        private int index2 = 1;
        private int index3 = 2;
        private int index4 = 3;
        private int index5 = 4;

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_KeyDown(object sender, KeyEventArgs e)
        {
            switch (e.KeyCode)
            {
                case Keys.Down:
                    index1++;
                    if (index1 > 4)
                    {
                        index1 = 0;
                    }
                    index2++;
                    if (index2 > 4)
                    {
                        index2 = 0;
                    }
                    index3++;
                    if (index3 > 4)
                    {
                        index3 = 0;
                    }
                    index4++;
                    if (index4 > 4)
                    {
                        index4 = 0;
                    }
                    index5++;
                    if (index5 > 4)
                    {
                        index5 = 0;
                    }

                    if (imgPaths != null)
                    {
                        setImage();
                    }
                    break;
                case Keys.Up:
                    index1--;
                    if (index1 < 0)
                    {
                        index1 = 4;
                    }
                    index2--;
                    if (index2 < 0)
                    {
                        index2 = 4;
                    }
                    index3--;
                    if (index3 < 0)
                    {
                        index3 = 4;
                    }
                    index4--;
                    if (index4 < 0)
                    {
                        index4 = 4;
                    }
                    index5--;
                    if (index5 < 0)
                    {
                        index5 = 4;
                    }

                    if (imgPaths != null)
                    {
                        setImage();
                    }

                    break;
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {

            this.Location = new Point(0, 0);
            this.Size = Screen.PrimaryScreen.WorkingArea.Size;

            imgPaths = Directory.GetFiles(folderPath, "*.jpg");

            if (imgPaths != null)
            {
                setImage();
            }
            

        }

        private void setImage()
        {
            panelIndex2.BackgroundImage = Image.FromFile(imgPaths[index1]);
            panelIndex1.BackgroundImage = Image.FromFile(imgPaths[index2]);
            mainPanel.BackgroundImage = Image.FromFile(imgPaths[index3]);
            panelIndexm1.BackgroundImage = Image.FromFile(imgPaths[index4]);
            panelIndexm2.BackgroundImage = Image.FromFile(imgPaths[index5]);
        }
    }
}
